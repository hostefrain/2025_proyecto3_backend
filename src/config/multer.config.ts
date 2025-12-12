import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      // Carpeta según el tipo de archivo
      const folder = file.fieldname === 'imagenes' ? './uploads/imagenes' : './uploads/archivos';
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      // Generar nombre único: uuid + extensión original
      const uniqueName = `${randomUUID()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Validar tipos de archivo
    if (file.fieldname === 'imagenes') {
      // Solo imágenes
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'), false);
      }
    } else if (file.fieldname === 'archivos') {
      // Archivos comunes (puedes ajustar según necesites)
      if (file.mimetype.match(/\/(pdf|doc|docx|xls|xlsx|txt)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Formato de archivo no permitido'), false);
      }
    } else {
      cb(null, true);
    }
  },
};