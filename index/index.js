const app = getApp()

Page({
  data: {
    pageInfo:[],
    pageData:[],
    analogData:[
    ],
    middleGap:'5px'
  },
  onLoad: function () {
    // 获取模拟数据
    var arr1 = [],arr2 = [];
    moNiData.forEach((ele,i) => {
      ele.id = i + '-' + new Date().getTime(); // 模拟获取随机ID
      arr1.push(ele);
      arr2.push(ele);
    });
    this.setData({
      pageInfo: arr1,
      pageData: arr2,
    })
  },

  onReachBottom(){
    console.log('小程序触底，触发加载数据')
    this.addPageInfo();
  },

  // 获取点击事件
  test(data){
    console.log(data)
  },
  // 增加数据
  addPageInfo(){
    var arr = this.data.pageInfo; // 总数据集合（节点ID使用）
    var arr2 = [];    // 新增数据集合（避免图片重复加载，导致速度过慢）
    var data = [
      {id:'0',image:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1133375469,702564064&fm=26&gp=0.jpg'},
      {id:'1',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595048329096&di=3924f6904e9eabe31a020134dbc5ee8c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn16%2F240%2Fw640h400%2F20181119%2F22df-hmivixn3889803.jpg'},
      {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
      {id:'3',image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2126590754,116561686&fm=26&gp=0.jpg'},
      {id:'4',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=128144883,1495567763&fm=26&gp=0.jpg'},
      {id:'5',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2223828760,2771029196&fm=26&gp=0.jpg'},
      {id:'6',image:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3600861892,4082801463&fm=26&gp=0.jpg'},
    ];
    data.forEach((ele,i) => {
      ele.id = i + '-' + new Date().getTime(); // 模拟获取随机ID
      arr.push(ele);
      arr2.push(ele);
    });
    this.setData({
      pageInfo: arr,
      pageData: arr2
    })
  },
})

var moNiData = [
  {id:'0',image:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1133375469,702564064&fm=26&gp=0.jpg'},
  {id:'1',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595048329096&di=3924f6904e9eabe31a020134dbc5ee8c&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn16%2F240%2Fw640h400%2F20181119%2F22df-hmivixn3889803.jpg'},
  {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
  {id:'3',image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2126590754,116561686&fm=26&gp=0.jpg'},
  {id:'4',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=128144883,1495567763&fm=26&gp=0.jpg'},
  {id:'5',image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2223828760,2771029196&fm=26&gp=0.jpg'},
  {id:'6',image:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3600861892,4082801463&fm=26&gp=0.jpg'},
];