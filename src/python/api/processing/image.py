import spectral as spy

rgb_wavelengths = [630, 532, 465]
def find_closest(arr, val):
    dif = [abs(float(x) - val) for x in arr]
    # Obtener el índice del valor con la menor diferencia
    closest_index = dif.index(min(dif))
    return closest_index

class Image:
    def __init__(self, bip_data_path, bip_header_path):
        img = spy.open_image(bip_header_path)
        wavelengths = img.metadata.get('wavelength')
        #('wavelengths of image:', wavelengths)
        self.img = img #img is an object, that have rows and samples (rows and cols of image), everyone with an array of values corresponding to bands
        self.bands = wavelengths #Bands is an array of numbers, this numbers represent the bandwith of each band (nm of wavelength).
        self.metadata = img.metadata
        self.header_path = bip_header_path
        
    def get_img(self):
        return self.img
    
    def get_bands(self):
        return self.bands
    
    def get_metadata(self):
        return self.metadata
    
    def get_rgb_composition(self, bands_selected=rgb_wavelengths):
        positions = [find_closest(self.bands, num) for num in bands_selected]
        print('available wavelength vy positions:', [self.bands[positions[0]], self.bands[positions[1]], self.bands[positions[2]]])
        rgb_image = spy.get_rgb(self.img, positions)
        #spy.view_cube(self.img, positions)
        return rgb_image
    
    def save_rgb(self, bands_selected=rgb_wavelengths):
        positions = [find_closest(self.bands, num) for num in bands_selected]
        spy.save_rgb(self.header_path+'.jpg', self.img, positions)
        return True