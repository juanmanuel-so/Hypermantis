import spectral.io.envi as envi

class Image:
    def __init__(self, bip_path, bip_header_path):
        img = envi.open(bip_header_path, bip_path)
        wavelengths = img.metadata.get('wavelength')
        self.img = img #img is an object, that have rows and samples (rows and cols of image), everyone with an array of values corresponding to bands
        self.bands = wavelengths #Bands is an array of numbers, this numbers represent the bandwith of each band (nm of wavelength).
        self.metadata = img.metadata
        
    def getImg(self):
        return self.img
    
    def getBands(self):
        return self.bands
    
    def getMetadata(self):
        return self.metadata
    