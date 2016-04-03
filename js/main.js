window.onload = function(){
  var oInp = document.getElementById('search-text');
  oInp.onfocus = function(){
    this.value = '';
  };
  oInp.onblur = function(){
    this.value = '空气净化器';
  };
};