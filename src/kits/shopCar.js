function getCar(){
    var car=JSON.parse(window.localStorage.getItem("shopcar")||"[]");
    return car
};
function setCar(k,v){
    var car=getCar();
    var index=null;
   car.forEach(function(item,i){
        if(item.goodsid==k){
            index=i
        }
   })
   if(index!==null){
       car[index].count=v*1+car[index].count*1
   }else{
    car.push({'goodsid':k,'count':v});
   }
    window.localStorage.setItem("shopcar",JSON.stringify(car));
};
function resetCar(k,v){
    var car=getCar();
    var index=null;
   car.forEach(function(item,i){
        if(item.goodsid==k){
            index=i
        }
   })
   if(index!==null){
       car[index].count=v*1
   }else{
    car.push({'goodsid':k,'count':v});
   }
    window.localStorage.setItem("shopcar",JSON.stringify(car));
};
function removeCar(k){
    var car=getCar();
    car.forEach(function(v,i){
        if(v.goodsid==k){
            car.splice(i,1)
        }
    });
    window.localStorage.setItem("shopcar",JSON.stringify(car));
}
function getTotal(){
    var l=getCar();
    var n=0;
    l.forEach(function(v){
      if(v.count){
        n+=v.count*1;
      }
    })
    return n;
}
//数组转对象 对象键为id，值为id对应商品的数量
function carObj(){
    var list=getCar();
    var o={};
    for(var i=0;i<list.length;i++){
        if(o[list[i].goodsid]){
            o[list[i].goodsid]=o[list[i].goodsid]+list[i].count;
        }else{
            o[list[i].goodsid]=list[i].count;
        }
    }
}
export default{
    getCar,setCar,removeCar,getTotal,resetCar
}