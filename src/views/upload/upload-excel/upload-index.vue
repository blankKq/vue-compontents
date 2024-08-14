<template>
  <div class="hello">
    <el-upload
      action
      accept=".xlsx, .xls"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handle"
    >
      <el-button type="primary">打开excel</el-button>
    </el-upload>
  </div>
</template>

<script  setup>
import { v4 } from "uuid";
import * as XLSX from "xlsx/xlsx.mjs";
const readFile = (file) => {
  //文件读取
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file); // 以二进制的方式读取
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};

const handle = async (ev) => {
  let file = ev.raw;
  // console.log(file);
  if (!file) {
    console.log("文件打开失败");
    return;
  } else {
    let data = await readFile(file);
    let workbook = XLSX.read(data, { type: "binary" }); //解析二进制格式数据
    // console.log("二进制数据的解析:");
    // console.log(workbook);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //获取第一个Sheet

    const sheet2JSONOpts = {
      /** Default value for null/undefined values */
      defval: "", //给defval赋值为空的字符串
    };

    // 获取到了excel数据
    let result = XLSX.utils.sheet_to_json(worksheet, sheet2JSONOpts); //json数据格式

    // 根据具体需求来解析处理数据格式
    // dataClassify(result);
  }
};

const dataClassify = (data) => {
  let stations = [];
  let devices = [];
  let deviceIndex = 0;
  data.forEach((item, index) => {
    let obj = {};
    let uuidValue = v4();

    obj.id = index + 1;
    obj.stationName = item.stationName;
    obj.stationName1 = item.stationName1;
    obj.stationCode = uuidValue;
    obj.stationId = index + 1;
    obj.stationType =
      item.stationType === "车站"
        ? "1"
        : item.stationType === "区间联锁房"
        ? "3"
        : "2";
    obj.isStaffed = item.isStaffed === "否" ? "0" : "1";
    obj.parentStationCode = null;
    stations.push(obj);

    Object.keys(item).forEach(ite => {
      var obj1 = {
        udpLocalPort: 17500,
        udpOvertTime: 17500,
        deviceLogicName: "CBIM-XLKSE",
        rdpPort: 3389,
        rdpUser: "administrator",
        rdpPassword: "crscd2019",
        sshIp: "192.168.200.212",
        sshUser: "crscd",
        sshPassword: "crscd2019",
        switchs: 1,
        comments: null
      };
      switch(true) {
        // 联锁维护机
        case ite === "联锁维护机":
          if (item[ite] !== "n/a") {
            obj1.deviceId = ++deviceIndex;
            obj1.deviceName = item.stationName + ite;
            obj1.deviceCtcsId = deviceIndex;
            obj1.deviceType = 1;
            obj1.belongStationCode = uuidValue;
            obj1.udpLocalIp = item[ite];
            obj1.rdpIp = item[ite];
            devices.push(obj1)
          }
          
          break;
        // 道口维护机SR1
        case ite === "道口维护机SR1" || ite === "道口维护机SR2" || ite === "道口维护机SR3" || ite === "道口维护机SR4" || ite === "道口维护机SR5":
          if (item[ite] !== "n/a") {
            obj1.deviceId = ++deviceIndex;
            obj1.deviceName = item.stationName + ite;
            obj1.deviceCtcsId = deviceIndex;
            obj1.deviceType = 4;
            obj1.belongStationCode = uuidValue;
            obj1.udpLocalIp = item[ite];
            obj1.rdpIp = item[ite];
            devices.push(obj1)
          }
          
          break;
        // RBC维护机A
        case ite === "RBC维护机A" || ite === "RBC维护机B" || ite === "RBC维护机C":
          if (item[ite] !== "n/a") {
            obj1.deviceId = ++deviceIndex;
            obj1.deviceName = item.stationName + ite;
            obj1.deviceCtcsId = deviceIndex;
            obj1.deviceType = 2;
            obj1.belongStationCode = uuidValue;
            obj1.udpLocalIp = item[ite];
            obj1.rdpIp = item[ite];
            devices.push(obj1)
          }
          break;
        // TSRS维护机
        case ite === "TSRS维护机":
          if (item[ite] !== "n/a") {
            obj1.deviceId = ++deviceIndex;
            obj1.deviceName = item.stationName + ite;
            obj1.deviceCtcsId = deviceIndex;
            obj1.deviceType = 3;
            obj1.belongStationCode = uuidValue;
            obj1.udpLocalIp = item[ite];
            obj1.rdpIp = item[ite];
            devices.push(obj1)
          }
          break;
      }
    })
  });
  console.log(JSON.stringify(stations));
  console.log(JSON.stringify(devices));
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 30px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
