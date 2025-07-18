from tensorflow import keras
import numpy as np
from skimage.transform import resize
import os
basedir = os.path.dirname(os.path.abspath(__file__))

model_path1 = os.path.join(basedir,'one_label-2.2.keras')
model_path2 = os.path.join(basedir, 'multilabel-2.1.keras')
model_path3 = os.path.join(basedir, 'extradata-1.1.keras')
class SingleLabelModelLoader:
    def __init__(self):
        self.model_name = model_path1 # hardcodeado
        self.model = keras.models.load_model(self.model_name)
        self.clases = [
            "Heterocapsa",  # número 0 → índice 0
            "ND",           # número 1 → índice 1
            "Pseudo-nitzchia",  # número 2 → índice 2
            "Rhizosolenia",    # número 3 → índice 3
            "Skeletonema",      # número 4 → índice 4
        ]


    def load(self):
        """Carga el modelo Keras hardcodeado."""
        try:
            self.model = keras.models.load_model(self.model_name)
            print(f'Modelo "{self.model_name}" cargado correctamente.')
        except Exception as e:
            print(f'Error al cargar el modelo "{self.model_name}": {e}')

    def predict(self, input_tensor):
        """Realiza predicciones usando el modelo cargado."""
        if self.model is None:
            raise ValueError('El modelo no está cargado. Llama primero a load().')
        img_resized = resize(input_tensor, (512, 512, input_tensor.shape[2]), preserve_range=True, anti_aliasing=True)

        # Convierte a tipo de dato compatible (float32 por ejemplo)
        img_resized = img_resized.astype(np.float32)

        print('Forma redimensionada:', img_resized.shape)

        # 3. Carga el modelo .keras
        # Cambia 'modelo.keras' por el nombre de tu modelo
        model = self.model

        # 4. Asegúrate que la imagen tenga el batch dimension (None, 512, 512, bandas)
        input_tensor = np.expand_dims(img_resized, axis=0)

        # 5. Pásala por el modelo
        predicciones = model.predict(input_tensor)
        predicted_class = int(np.argmax(predicciones))
        print('Clase predicha:', predicted_class)
        print('Clase string predicha:', self.clases[predicted_class])
        # 6. Imprime las predicciones
        # Recibe un array de predicciones de la cantidad de clases, donde cada fila corresponde a una imagen y cada columna a una clase.

        print('Predicciones:', predicciones)
        result = {
            'model_msg': f'Result: { self.clases[predicted_class]}',
            'literal_result': predicted_class,
            'probabilities': predicciones,
            'classes': self.clases,
        }
        return result

class MultiLabelModelLoader:
    def __init__(self):
        self.model_name = model_path2 # hardcodeado
        self.model = keras.models.load_model(self.model_name)
        self.clases = [
            "Chaetoceros",  # número 0 → índice 0
            "Heterocapsa",           # número 1 → índice 1
            "Leptocylindrus",  # número 2 → índice 2
            "ND",    # número 3 → índice 3
            "Pseudo-nitzchia",      # número 4 → índice 4
            "Rhizosolenia",
            "Skeletonema"
        ]
    def load(self):
        """Carga el modelo Keras hardcodeado."""
        try:
            self.model = keras.models.load_model(self.model_name)
            print(f'Modelo "{self.model_name}" cargado correctamente.')
        except Exception as e:
            print(f'Error al cargar el modelo "{self.model_name}": {e}')
    def predict(self, input_tensor):
        """Realiza predicciones usando el modelo cargado."""
        if self.model is None:
            raise ValueError('El modelo no está cargado. Llama primero a load().')
        img_resized = resize(input_tensor, (512, 512, input_tensor.shape[2]), preserve_range=True, anti_aliasing=True)

        # Convierte a tipo de dato compatible (float32 por ejemplo)
        img_resized = img_resized.astype(np.float32)

        print('Forma redimensionada:', img_resized.shape)

        # 3. Carga el modelo .keras
        # Cambia 'modelo.keras' por el nombre de tu modelo
        model = self.model

        # 4. Asegúrate que la imagen tenga el batch dimension (None, 512, 512, bandas)
        input_tensor = np.expand_dims(img_resized, axis=0)

        # 5. Pásala por el modelo
        predicciones = model.predict(input_tensor)
        print('Predicciones:', predicciones)
        predicted_classes = np.where(predicciones[0] > 0.5)[0]
        print('Clases predichas:', predicted_classes)
        print('Clases string predichas:', [self.clases[i] for i in predicted_classes])
        # 6. Imprime las predicciones
        print('Predicciones:', predicciones)
        result = {
            'model_msg': f'Result: { [self.clases[i] for i in predicted_classes]}',
            'literal_result':  [self.clases[i] for i in predicted_classes],
            'probabilities': predicciones,
            'classes': self.clases,
        }
        return result
class ExtradataModelLoader:
    def __init__(self, mtd_tensor):
        self.model_name = model_path3
        self.model = keras.models.load_model(self.model_name)
        self.mtd_tensor = mtd_tensor  # Tensor de metadatos
        self.clases = [
            "Heterocapsa",  # número 0 → índice 0
            "ND",           # número 1 → índice 1
            "Pseudo-nitzchia",  # número 2 → índice 2
            "Rhizosolenia",    # número 3 → índice 3
            "Skeletonema",      # número 4 → índice 4
        ]


    def load(self):
        """Carga el modelo Keras hardcodeado."""
        try:
            self.model = keras.models.load_model(self.model_name)
            print(f'Modelo "{self.model_name}" cargado correctamente.')
        except Exception as e:
            print(f'Error al cargar el modelo "{self.model_name}": {e}')

    def predict(self, input_tensor):
        """Realiza predicciones usando el modelo cargado."""
        if self.model is None:
            raise ValueError('El modelo no está cargado. Llama primero a load().')
        img_resized = resize(input_tensor, (512, 512, input_tensor.shape[2]), preserve_range=True, anti_aliasing=True)

        # Convierte a tipo de dato compatible (float32 por ejemplo)
        img_resized = img_resized.astype(np.float32)

        print('Forma redimensionada:', img_resized.shape)

        # 3. Carga el modelo .keras
        # Cambia 'modelo.keras' por el nombre de tu modelo
        model = self.model

        # 4. Asegúrate que la imagen tenga el batch dimension (None, 512, 512, bandas)
        input_tensor = np.expand_dims(img_resized, axis=0)

        # 5. Pásala por el modelo
        print('used metadata:', self.mtd_tensor)
        imagen_batch = np.expand_dims(input_tensor, axis=0)      # shape: (1, 512, 512, n_bandas)
        metadata_batch = np.expand_dims(self.mtd_tensor, axis=0)

        predicciones = model.predict([input_tensor, metadata_batch])
        predicted_class = int(np.argmax(predicciones))
        print('Clase predicha:', predicted_class)
        print('Clase string predicha:', self.clases[predicted_class])
        # 6. Imprime las predicciones
        # Recibe un array de predicciones de la cantidad de clases, donde cada fila corresponde a una imagen y cada columna a una clase.

        print('Predicciones:', predicciones)
        result = {
            'model_msg': f'Result: { self.clases[predicted_class]}',
            'literal_result': predicted_class,
            'probabilities': predicciones,
            'classes': self.clases,
        }
        return result