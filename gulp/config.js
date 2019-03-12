module.exports = {
  src : {
    root    : 'src/',
    templates    : 'src/templates',
    templatesData: 'src/templates/data',
    sass    : 'src/sass/',
    sassGen : 'src/sass/generated',
    js      : 'src/js/',
    vendors : 'src/js/vendors/',
    svg     : 'src/img/svg/',
    img     : 'src/img/',
    icons   : 'src/icons',
    helpers : 'gulp/helpers/',
    // path to svg sources for sprite:svg task
    iconsSvg: 'src/icons'
  },
  dest:{
    root    : 'build/',
    css     : 'build/css/',
    html    : 'build/',
    js      : 'build/js/',
    vendors : 'build/js/vendors/',
    img     : 'build/img/'
  },
  errorHandler: require('./util/handle-errors')
};