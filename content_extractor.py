import os
import re
import sys
import argparse

# --- CONFIGURACIÓN ---
OUTPUT_FILE = 'contexto_proyecto.xml'

# Extensiones permitidas
ALLOWED_EXTENSIONS = {
    'js', 'jsx', 'ts','.java', '.xml', '.yml', '.yaml', '.properties', '.sql', '.md', '.txt', '.json', '.adoc'
}

# Carpetas ignoradas
IGNORED_DIRS = {
    'build', 'out', '.git', '.idea', '.vscode', '.mvn',
    'wrapper', 'node_modules', 'coverage', 'dist', 'logs', 'tmp', '__pycache__'
}

IGNORED_FILES = {
    os.path.basename(__file__),
    OUTPUT_FILE,
    'mvnw', 'mvnw.cmd', 'package-lock.json', 'yarn.lock', 'contexto_proyecto.xml'
}

SECRET_PATTERNS = [
    r'(?i)(password|secret|key|token|auth)\s*[:=]\s*[\"\']?([^\s\"\']+)[\"\']?',
    r'(postgres:\/\/)([^:]+):([^@]+)@'
]

def mask_secrets(content):
    masked_content = content
    for pattern in SECRET_PATTERNS:
        masked_content = re.sub(pattern, r'\1: [REDACTED]', masked_content)
    return masked_content

def estimate_tokens(text):
    return len(text) // 4

def get_relative_path(path, start_path):
    try:
        return os.path.relpath(path, start_path)
    except ValueError:
        return path

def generate_tree_structure(base_dir, target_path):
    """Genera el árbol solo del objetivo, pero mostrando su ubicación relativa."""
    tree_str = "<project_structure>\n"

    if os.path.isfile(target_path):
        rel_path = get_relative_path(target_path, base_dir)
        tree_str += f"  {rel_path}\n"
    else:
        # Es un directorio
        for root, dirs, files in os.walk(target_path):
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

            # Calcular nivel de indentación basado en la raíz del proyecto
            rel_root = get_relative_path(root, base_dir)
            if rel_root == ".":
                level = 0
            else:
                level = rel_root.count(os.sep) + 1

            indent = '  ' * level
            tree_str += f"{indent}{os.path.basename(root)}/\n"

            subindent = '  ' * (level + 1)
            for f in files:
                if os.path.splitext(f)[1] in ALLOWED_EXTENSIONS and f not in IGNORED_FILES:
                    tree_str += f"{subindent}{f}\n"

    tree_str += "</project_structure>\n\n"
    return tree_str

def extract_content(base_dir, target_path):
    content_buffer = ""
    file_count = 0

    # Caso 1: Es un solo archivo
    if os.path.isfile(target_path):
        files_to_process = [target_path]
        root_for_display = os.path.dirname(target_path)
    # Caso 2: Es un directorio
    else:
        files_to_process = []
        for root, dirs, files in os.walk(target_path):
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
            for file in files:
                files_to_process.append(os.path.join(root, file))

    # Procesar lista de archivos
    for file_path in files_to_process:
        filename = os.path.basename(file_path)
        _, ext = os.path.splitext(filename)

        if ext in ALLOWED_EXTENSIONS and filename not in IGNORED_FILES:
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    raw_content = f.read()
                    safe_content = mask_secrets(raw_content)

                    # SIEMPRE usamos la ruta relativa desde la raíz del proyecto (base_dir)
                    # Esto es clave para que la IA entienda dónde encaja el archivo.
                    rel_path = get_relative_path(file_path, base_dir)

                    content_buffer += f'<file path="{rel_path}">\n'
                    content_buffer += safe_content
                    content_buffer += f'\n</file>\n\n'

                    file_count += 1
                    print(f"📖 Leído: {rel_path}")

            except Exception as e:
                print(f"❌ Error leyendo {file_path}: {e}")

    return content_buffer, file_count

def main():
    # Configuración de argumentos
    parser = argparse.ArgumentParser(description="Herramienta de extracción de contexto para LLMs.")
    parser.add_argument(
        "target",
        nargs="?",
        default=".",
        help="Archivo o Directorio específico a escanear. (Default: Directorio actual)"
    )
    args = parser.parse_args()

    # Rutas base
    current_working_dir = os.getcwd() # Desde donde ejecutas el script (Raíz del proyecto)
    target_path = os.path.abspath(args.target) # Lo que quieres escanear

    # Validaciones
    if not os.path.exists(target_path):
        print(f"❌ Error: La ruta '{args.target}' no existe.")
        return

    print(f"🚀 Iniciando escaneo...")
    print(f"📂 Raíz del Proyecto: {current_working_dir}")
    print(f"🎯 Objetivo: {get_relative_path(target_path, current_working_dir)}")
    print("-" * 50)

    # Generación
    tree = generate_tree_structure(current_working_dir, target_path)
    content, count = extract_content(current_working_dir, target_path)

    final_output = tree + content

    # Guardado
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(final_output)

    # Estadísticas
    tokens = estimate_tokens(final_output)
    size_kb = os.path.getsize(OUTPUT_FILE) / 1024

    print("-" * 50)
    print(f"✅ COMPLETADO. Archivo generado: {OUTPUT_FILE}")
    print(f"📄 Archivos procesados: {count}")
    print(f"💾 Tamaño: {size_kb:.2f} KB")
    print(f"🧠 Tokens estimados: ~{tokens}")

if __name__ == "__main__":
    main()