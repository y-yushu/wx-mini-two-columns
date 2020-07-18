// component/yys-waterfallFlow/yys-waterfallFlow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标准数据
    noramalData:{
      type: Array,
    },
    // 瀑布中间距 默认0
    middleGap:{
      type: String,
      value: '0'
    },
    // 瀑布上下间距 默认40
    waterfallGap:{
      type:Number,
      value: 40
    },
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
  },

  /**
   * 生命周期--组件挂载前
   */
  attached(){
    const that = this;
    that.createSelectorQuery().select('.page_left').boundingClientRect(res => {
      that.setData({waterfallWidth: res.width});  // 获取瀑布宽度，并赋值
      that.getNoramalData(); // 【获取瀑布数据】
    }).exec();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 方法--【获取瀑布数据】
     */
    getNoramalData(){
      var that = this;
      const noramalData = that.properties.noramalData;
      var waterfallWidth = that.data.waterfallWidth;
      noramalData.forEach((element,i) => {
        wx.getImageInfo({   // 遍历获取图片数据
          src: element.image,
          success(res){
            element.Height = parseInt(Math.round(res.height * waterfallWidth / res.width));
            that.setList(element,i);  // 调用【瀑布填充】方法
          }
        })
      })

    },

    /**
     * 方法--【瀑布填充】
     * @param {Array} element => 瀑布内容 
     * @param {num} i => 遍历下标
     */
    setList(element,i){
      console.log(i,element)
      var that = this;
      var leftH = this.data.leftHight;    // 左瀑布高度
      var rightH = this.data.rightHight;  // 右瀑布高度
      var leftData = this.data.leftList;  // 左瀑布内容
      var rightData = this.data.rightList; // 右瀑布内容
      // 判断是否有标题
      var waterfallGap = 0;
      if(true){
        waterfallGap = this.properties.waterfallGap;
      }
      // 判断瀑布长度，短瀑布增加
      if (leftH == rightH || leftH < rightH) {
        leftH += element.Height + waterfallGap;
        leftData.push(element);
        this.setData({
          leftList: leftData,
          leftHight: leftH,
        })
      } else {
        rightH += element.Height + waterfallGap;
        rightData.push(element);
        this.setData({
          rightList: rightData,
          rightHight: rightH,
        })
      }
      
    }

  }
})
