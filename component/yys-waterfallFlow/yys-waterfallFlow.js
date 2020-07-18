// component/yys-waterfallFlow/yys-waterfallFlow.js
Component({
  /**
   * 在组件定义时的选项中启用多slot支持
   */
  options: {
    multipleSlots: true
  },

  /**
   * 引入自定义样式
   */
  externalClasses: [
    // 图片自定义样式
    'class-image',
    'class-image-left',
    'class-image-right',
    // 标题自定义样式
    'class-title',
  ],

  /**
   * 组件的属性列表
   */
  properties: {
    // 标准数据是否为总集合
    isNoramalDataOrList:{
      type: Boolean,
      value: false
    },
    // 标准数据
    noramalData:{
      type: Array,
    },
    // 瀑布中间距 默认0
    middleGap:{
      type: String,
      value: '0'
    },
    // 自定义组件高度 单位px
    // 传入后组件不调用获取自定义组件高度方法，加载速度加快
    cuSlotHeight1:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    waterfallWidth: 0, // 瀑布宽度
    leftList: [],   // 左瀑布
    rightList: [],  // 右瀑布
    leftHight: 0,   // 左瀑布高度
    rightHight: 0,  // 右瀑布高度
    isInitialize: false,  // 是否初始化
    waterfallGap: 40, // 标题高度
    isSlotHeight: false, // 是否获取自定义组件高度
    cuSlotHeight2: 0,  // 自定义组件高度
  },

  /**
   * 监听数据
   */
  observers:{
    noramalData(val){
      if(!this.data.isInitialize){ return };  // 未初始化拦截
      if(this.properties.isNoramalDataOrList){  // 判断是否仅遍历新增数据
        var arr = val.removeDuplication(this.data.leftList,this.data.rightList);
        this.getNoramalData(arr);  // 【获取瀑布数据】
      }else{
        this.getNoramalData(val);  // 【获取瀑布数据】
      }
    }
  },

  /**
   * 生命周期--组件挂载前 yyshu 20200718
   */
  attached(){
    const that = this;
    that.createSelectorQuery().select('.page_left').boundingClientRect(res => {
      that.setData({waterfallWidth: res.width});  // 获取瀑布宽度，并赋值
      that.getNoramalData(that.properties.noramalData,true); // 【获取瀑布数据】并初始化监听数据
    }).exec();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 方法--【获取瀑布数据】 yyshu 20200718
     * @param {Boolean} type => 是否是初始化 
     */
    getNoramalData(noramalData,type = false){
      if(type){ this.data.isInitialize = true }; // 获取宽度后初始化
      console.log('【新增数据】',noramalData);
      var that = this;
      var waterfallWidth = that.data.waterfallWidth;
      noramalData.forEach((element,i) => {
        wx.getImageInfo({   // 遍历获取图片数据
          src: element.image,
          success(res){
            element.Height = parseInt(Math.round(res.height * waterfallWidth / res.width)); // 图片高度计算
            that.setList(element);  // 调用【瀑布填充】方法
          }
        })
      })
    },

    /**
     * 方法--【瀑布填充】 yyshu 20200718
     * @param {Array} element => 瀑布内容 
     */
    setList(element){
      var leftH = this.data.leftHight;    // 左瀑布高度
      var rightH = this.data.rightHight;  // 右瀑布高度
      var leftData = this.data.leftList;  // 左瀑布内容
      var rightData = this.data.rightList; // 右瀑布内容
      // 判断是否有标题
      if(!element.title){
        element.waterfallGap = this.properties.waterfallGap;
      }else{
        // 是否传入了自定义组件高度
        if(this.properties.cuSlotHeight1 !== 0){
          this.getSlotHeight(this.data.isSlotHeight); // 延时严重，不使用自动获取
          element.waterfallGap = this.properties.cuSlotHeight2;
        }else{
          element.waterfallGap = this.properties.cuSlotHeight1;
        }
      }
      // 判断瀑布长度，短瀑布增加
      if (leftH == rightH || leftH < rightH) {
        leftH += element.Height + element.waterfallGap;
        leftData.push(element);
        this.setData({
          leftList: leftData,
          leftHight: leftH,
        })
      } else {
        rightH += element.Height + element.waterfallGap;
        rightData.push(element);
        this.setData({
          rightList: rightData,
          rightHight: rightH,
        })
      };
    },

    /**
     * 方法--【获取自定义组件高度】
     * 因为延时太严重了，不适用自动获取方法 yyshu 20200717
     */
    getSlotHeight(type){
      if(type){ return };
      const that = this;
      that.createSelectorQuery().select('.slot-title').boundingClientRect((res) => {
        if(!res){ return };
        that.setData({
          isSlotHeight: true,
          cuSlotHeight2: Math.round(res.height),
        })
      }).exec();
    },

    /**
     * 方法--【点击元素】
     * @param {List} data => 点击元素 
     */
    clickDom(data){
      this.triggerEvent("clickDom", data.currentTarget.dataset.data);
    },
  },
})

/**
 * 原型方法--数组去重
 */
Array.prototype.removeDuplication = function(arr1,arr2){
  var arr0 = [],ifHas = false;
  this.forEach((ret) => {
    ifHas = false;
    arr1.forEach((ele1) => {
      if(ele1.id == ret.id) ifHas = true;
    })
    arr2.forEach((ele2) => {
      if(ele2.id == ret.id) ifHas = true;
    })
    if(!ifHas) arr0.push(ret);
  })
  return arr0;
}