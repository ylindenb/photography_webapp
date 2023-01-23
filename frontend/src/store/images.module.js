import axios from 'axios';

export const imagesStore = {
  namespaced: true,
  state: {
    images: [],
    imagesOfPortfolio: [],
    filteredImages: [],
    productCatalogs: [],
    categoryDescriptions: [],
  },
  actions: {
    fetchImages(context) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/images')
        .then(res => {
          context.commit('setImages', res.data.images)
        });
    },
    setImagesOfPortfolio(context, images) {
      context.commit('setImagesOfPortfolio', images);
    },
    fetchProductCatalogs(context) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/productcatalogs')
        .then(res => {
          // sorting the array from small to large
          let tempProductCatalog = res.data.productCatalogs;
          tempProductCatalog.sort((a, b) => {
            let aa = a.format.substring(0, a.format.indexOf('x'));
            let bb = b.format.substring(0, b.format.indexOf('x'));
            return aa == bb ? 0 : aa < bb ? -1 : 1;
          })
          context.commit('setProductCatalogs', tempProductCatalog)
        });
    },
    fetchCategoryDescriptions(context) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/categoryDescriptions')
        .then(res => {
          context.commit('setCategoryDescriptions', res.data.categoryDescriptions)
        });
    },
    fetchFilteredImages(context, categoryDescriptionId, imagesInPortfolio) {
      return axios
        .get(import.meta.env.VITE_API_URL + '/categories/' + categoryDescriptionId)
        .then(res => {
          if(imagesInPortfolio == undefined) {
            context.commit('setFilteredImages', res.data.category.images)
            return;
          }
          let imagesInCategory = res.data.category.images;
          let matchingImages = imagesInCategory.filter(imageInCategory => {
            return imagesInPortfolio.some(imageInPortfolio => imageInCategory._id.includes(imageInPortfolio._id))
          });
          context.commit('setFilteredImages', matchingImages);
        });
    },
  },
  mutations: {
    setImages(state, images) {
      state.images = images;
    },
    setImagesOfPortfolio(state, images) {
      state.imagesInPortfolio = images;
    },
    setProductCatalogs(state, productCatalogs) {
      state.productCatalogs = productCatalogs;
    },
    setCategoryDescriptions(state, categoryDescriptions) {
      state.categoryDescriptions = categoryDescriptions;
    },
    setFilteredImages(state, images) {
      state.filteredImages = images;
    },
  },
};
