const area = [127.2, 87, 197.5, 28, 127, 117, 167, 197, 287, 177.3, 27.6, 57.6, 77, 97, 77, 57, 147.6, 257.4, 296.4, 127, 230, 285, 37.6, 187]

const totalPrice = [351287.41, 563297.00, 212871.05, 152557.98, 785287.75, 695287.02, 574287.777, 135287.82, 299287.93, 145287.01, 147287.05, 152287.35, 180287.26, 190287.45, 184287.69, 192287.48, 198287.16, 201287.95, 210287.47, 220287.32, 225287.64]


const structure = ['1室2厅', '1室1厅', '2室2厅', '2室1厅', '3室1厅', '3室2厅', '4室2厅', '4室1厅', '5室1厅', '5室2厅', '6室2厅', '6室1厅', '7室3厅', '7室2厅', '9室3厅', '8室3厅', '8室2厅', '9室厅']

const layoutName = ['A户型', 'B户型', 'C户型', 'D户型', 'E户型', 'F户型']

const collectNum = [25, 20, 40, 39, 42, 0, 0, 112, 115]
const order = ['1', '2']
const status = ['1', '2', '3']

const photos = ['http://yftapp.deyou360.com/home/aa.jpg', 'http://yftapp.deyou360.com/home//home/bb.jpg', 'http://yftapp.deyou360.com/home/cc.jpg', 'http://yftapp.deyou360.com/home/dd.jpg', 'http://yftapp.deyou360.com/home/ee.jpg', 'http://yftapp.deyou360.com/home/ff.jpg']

let floorName = 1
let floorNameNume = 1

function data(builDingName, builDingId, unitId, unitName, roomLength, k) {

  let queryData = {

    builDingId: builDingId,
    unitId: unitId,
    number: number(roomLength, k), //房号
    floorName: floorName,
    totalPrice: totalPrice[Math.floor((Math.random() * totalPrice.length))], //总价
    area: area[Math.floor((Math.random() * area.length))], //面积
    builDingName: builDingName, //楼栋名
    unitName: unitName, //单元名
    structure: structure[Math.floor((Math.random() * structure.length))], //几室几厅(3室2厅)
    layoutName: layoutName[Math.floor((Math.random() * layoutName.length))], //户型名称
    collectNum: collectNum[Math.floor((Math.random() * collectNum.length))], //收藏数
    order: order[Math.floor((Math.random() * order.length))], //订购(是否内定)
    userId: '', //用户id
    status: status[Math.floor((Math.random() * status.length))], //状态
    photos: photos[Math.floor((Math.random() * photos.length))], //详情页图片
    desc: '您在命令行只能更新当前会话的PATH变量，如Clone Flutter repo所示。 但是，您可能需要的是永久更新此变量，以便您可以运行flutter命令在任何终端会话中。对于所有终端会话永久修改此变量的步骤是和特定计算机系统相关的。通常，您会在打开新窗口时将设置环境变量的命令添加到执行的文件中。', //详情页描述
  }
  return queryData
}

function number(roomLength, k) {
  if (k === 0) {
    floorName = 1
    floorNameNume = 1
  }
  if (k && k % roomLength === 0) {
    floorNameNume = 1
    floorName++
  }
  let tmp = `${floorName}0${floorNameNume}`
  floorNameNume++
  return tmp
}

module.exports = data;
