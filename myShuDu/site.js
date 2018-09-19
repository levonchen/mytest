


var SIZE = 6;
var LEVEL_MAX = 10;

//每个单元里面有 横竖 上有几个小的单元格
var X_UNIT_WIDTH = 3;
var Y_UNIT_HEIGHT = 2;

// 横竖上有多少个单元
var X_UNIT_COUNT = 2;
var Y_UNIT_COUNT = 3;


var table_born = [
  [4,2,6,1,5,3],
  [1,5,3,4,2,6],
  [5,6,1,2,3,4],
  [2,3,4,5,6,1],
  [3,1,5,6,4,2],
  [6,4,2,3,1,5]
];

var ySwapOptions_6 = [
  [0,1],
  [2,3],
  [4,5],
];
var xSwapOptions_6 = [
  [0,1],
  [1,2],
  [0,2],
  [3,4],
  [4,5],
  [3,5]
]

function getBornTable(){
  return table_born;
}

function getYSwapOptions(){
  return ySwapOptions_6;
}

function getXSwapOptions(){
  return xSwapOptions_6;
}

function cloneTable_born(inputTable,size){
  var outputTable = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
  ];
  for(var y = 0; y < size; y++){
    for(var x = 0; x < size; x++){
      outputTable[y][x] = inputTable[y][x];
    }
  }
  return outputTable;
}


//y1列和y2列互换, x1,x2行互换
function swapRow(inputTable,y1,y2){
 var outputTable = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
  ];

  for(var x= 0; x < 6; x++){
    outputTable[y1][x] = inputTable[y2][x];
    outputTable[y2][x] = inputTable[y1][x];
  }

  for(var y = 0; y < 6; y++)
  {
    if(y == y1 || y == y2){
      continue;
    }
    for(x = 0; x<6;x++){
      outputTable[y][x] = inputTable[y][x];
    }
  };

  return outputTable;
}

function swapColumn(inputTable,x1,x2){
  var outputTable = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
  ];

  for(var y= 0; y < 6; y++){
    outputTable[y][x1] = inputTable[y][x2];
    outputTable[y][x2] = inputTable[y][x1];
  }

  for(var y = 0; y < 6; y++)
  {
    for(x = 0; x<6;x++){
      if(x == x1 || x == x2)
      {
        continue;
      }
      outputTable[y][x] = inputTable[y][x];
    }
  };

  return outputTable;
}


function checkUnitCells(viewDataTable ){

  for(var yCount = 0; yCount < Y_UNIT_COUNT; yCount ++){

    for(var xCount = 0; xCount < X_UNIT_COUNT; xCount++){

      var map = {};

      var map = {};
      for(var yu = 0; yu < Y_UNIT_HEIGHT; yu++)
      {
        for(var xu = 0; xu < X_UNIT_WIDTH; xu++)
        {
            var y = yCount * Y_UNIT_HEIGHT + yu;
            var x = xCount * X_UNIT_WIDTH + xu;
            if(viewDataTable[y][x].txtColor == "need_fill_txt"){
              continue;
            }
            var value = Number(viewDataTable[y][x].value);
            map["v" + value.toString()] = 1; 
         }
      }



      for(var yu = 0; yu < Y_UNIT_HEIGHT; yu++)
      {
        for(var xu = 0; xu < X_UNIT_WIDTH; xu++)
        {
            var y = yCount * Y_UNIT_HEIGHT + yu;
            var x = xCount * X_UNIT_WIDTH + xu;


            if(viewDataTable[y][x].txtColor !== "need_fill_txt"){
              continue;
            }

            if(!viewDataTable[y][x].value){
              viewDataTable[y][x].errorClass = "validate_error";
              continue;
            }
             var value = Number(viewDataTable[y][x].value);
             if(value == 0){
              viewDataTable[y][x].errorClass = "validate_error";
              continue;
             }
    
             if(map["v" + value.toString()]){
              viewDataTable[y][x].errorClass = "validate_error";
             }else{
               map["v" + value.toString()] = 1;
             }
        }
      }

    }
  }

}

function maskCells(inputTable,level){
  var count = 30;
  //level = level % LEVEL_MAX;  

  if(level < 3){
    count = 10;
  }else if(level < 6) {
    count = 15;
  }else if(level < 8){
    count = 20;
  } else if( level < 10){
    count = 25;
  }else{
    count  = 28;
  }

  for(var index = 0; index < count;index++){

    do{
      var x = Math.floor(Math.random() * SIZE);
      var y = Math.floor(Math.random() * SIZE);

      if(inputTable[y][x] > 0){
        inputTable[y][x] = 0;
        break;
      }

    }while(true);
  }
  return inputTable;
}

function confuseInitTable(level){

  var cfCount = 1;
  if(level > 4){
    cfCount = 2;
  }
  if(level > 7){
    cfCount = 3;
  }

  if(level >= 9){
    cfCount = 4;
  }

  var bornT = cloneTable_born(getBornTable(),SIZE);

  for(var index = 0; index < cfCount; index++)
  {
    var yoptions = getYSwapOptions();
    var yIndex = Math.floor(Math.random() * yoptions.length);
    var swapY = yoptions[yIndex];
    bornT = swapRow(bornT,swapY[0],swapY[1]);

    var xoptions = getXSwapOptions();
    var xIndex = Math.floor(Math.random() * xoptions.length);
    var swapX = xoptions[xIndex];
    bornT = swapColumn(bornT,swapX[0],swapX[1]);
  }

  return bornT;   
}

function bornStartTable(level){

    var output = confuseInitTable(level);

    var resultTable = maskCells(output,level);

    var init_data = [];

    for(var y = 0; y < 6; y++)
    {
      var row = [];

      var bottomClass = "";

      if(y == 1 || y == 3)
      {
        bottomClass = "bottom_border_cell";
      }

      for(var x = 0; x < 6; x++)
      {
        var rightClass = "";
        if( x == 2){
          rightClass = "right_border_cell";
        }
        var value = resultTable[y][x];
        var txtColor = "";
        if(value == 0){
            txtColor = "need_fill_txt";
            value = "";
        }
        row.push({
          bottomClass:bottomClass,
          rightClass:rightClass,
          txtColor:txtColor,
          errorClass:"",
          value:value,
        });
      }

      init_data.push(row);
    }

    return init_data;

}

function checkValidate(viewDataTable)
{
   //check column
   for(var x = 0; x <SIZE; x++)
   {
      var map = {};
      for(var y = 0; y < SIZE; y++)
      {
        //不想再写一个循环了，直接借用这个循环来清空错误单元格
        viewDataTable[y][x].errorClass = "";

        if(viewDataTable[y][x].txtColor == "need_fill_txt"){
          continue;
        }

        var value = Number(viewDataTable[y][x].value);
        map["v" + value.toString()] = 1; 
      }

      for(var y = 0; y < SIZE; y++)
      {
        
        if(viewDataTable[y][x].txtColor !== "need_fill_txt"){
          continue;
        }

        if(!viewDataTable[y][x].value){
          viewDataTable[y][x].errorClass = "validate_error";
          continue;
        }
         var value = Number(viewDataTable[y][x].value);
         if(value == 0){
          viewDataTable[y][x].errorClass = "validate_error";
          continue;
         }

         if(map["v" + value.toString()]){
          viewDataTable[y][x].errorClass = "validate_error";
         }else{
           map["v" + value.toString()] = 1;           
         }
      }
   }

   //check row
   for(var y = 0; y <SIZE; y++)
   {
     var map = {};
     for(var x = 0; x < SIZE; x++)
     {
      if(viewDataTable[y][x].txtColor == "need_fill_txt"){
        continue;
      }
      var value = Number(viewDataTable[y][x].value);
      map["v" + value.toString()] = 1; 
     }

     for(var x = 0; x < SIZE; x++)
     {
      if(viewDataTable[y][x].txtColor !== "need_fill_txt"){
        continue;
      }

       if(!viewDataTable[y][x].value){
         viewDataTable[y][x].errorClass = "validate_error";
         continue;
       }
        var value = Number(viewDataTable[y][x].value);
        if(value == 0){
         viewDataTable[y][x].errorClass = "validate_error";
         continue;
        }

        if(map["v" + value.toString()]){
         viewDataTable[y][x].errorClass = "validate_error";
        }else{
          map["v" + value.toString()] = 1;         
        }
     }
   };

   //check small unit

   checkUnitCells(viewDataTable);
   return viewDataTable;
}

var tableContentVue = new Vue({
  el:"#tablecontent",
  data:{
    table_data:bornStartTable(1),
    feedback: {
      eleClass:"feedbackSucceed",
      value:"——"
    },
    levelSelected: 1    
  },
  computed:{
    selectedClass:function(rindex){
      if(rindex == this.selectedRow){
        return "selected";
      }else{
        return "";
      }
    },
    levelOptions:function(){
      var levels = [];
      for(var index = 1; index <= 10;index++){
        levels.push(index);
      }
      return levels;
    }
  },
  methods:{
    onStartClicked:function(){
      var level = this.levelSelected;
      this.table_data = bornStartTable(level);
      this.feedback.value = "---------";
    },
    onCheckClicked:function(){
      this.table_data = checkValidate(this.table_data);
      var error_count = 0;
      for(var y = 0; y <SIZE; y++)
      {
        for(var x = 0; x < SIZE; x++)
        {
          var item = this.table_data[y][x];
          if(item.errorClass == "validate_error"){
            error_count ++;
          }
        }
      };
      if(error_count == 0){
        this.feedback.eleClass = "feedbackSucceed";
        this.feedback.value = "哇你成功了"
      }else{
        this.feedback.eleClass = "feedbackFailed"
        this.feedback.value = "继续努力啊!!!";
      }
    },
    cellClicked:function(rdata,cdata,rindex,cindex,event){
      var el = $(event.currentTarget);
      var $this = this;
      var $row = rindex;
      var $column = cindex;

      var content = "<table class='pop'>" 
                  + "<tr><td><div><button>1</button> <button>2</button> <button>3</button></div> </td> </tr>" 
                  + "<tr><td><button>4</button> <button>5</button> <button>6</button> </td> </tr>" 
                  + "</table> "
      el.popover({
                    container:"body",
                    placement:'bottom',
                    trigger:'click', //触发方式                            
                    title:"",//设置 弹出框 的标题
                    html: true, // 为true的话，data-content里就能放html代码了
                    content:content,//这里可以直接写字符串，也可以 是一个函数，该函数返回一个字符串；
                  });
      el.on('shown.bs.popover',function(args){
        var x = args;
        console.log("t");

        $(".popover-content table").off("click","button");
        $("body")
        $(".popover-content table").on("click","button",function(){
          var bt = $(this);
          var text = bt.text();
          //el.text(text);
          $this.table_data[$row][$column].value = Number(text);
          //$this.$forceUpdate()
          //el.popover('destroy');
        });
      })
      el.popover('show');
    },

    nothing:function(){
      
    },

    table_header_clicked:function(columnname){
     

    },

    editableClass:function(header){
      if(!header || !header.edit_type){
        return "";
      }
      if(header.edit_type.toString() != '0'){
        return "editable";
      }else{
        return "";
      }
    }
  }
});

$(document).ready(function(){
   //$('.popover-show').popover('show');
  // $('button').popover({html : true });

   $('html').on('click', function (e) {
    $('div.popover').each(function () {

        console.log("Force close");
        var cellElement = $(e.target);
        var id = cellElement.attr("aria-describedby");
        var thisId = $(this).attr("id");
        if(id != thisId){
          $(this).popover('destroy');
        }

    });
});

});