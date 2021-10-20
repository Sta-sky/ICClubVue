
import { ElNotification } from 'element-plus'

const ip = '127.0.0.1'

const staticServer = `http://${ip}:8080/api/static`
const httpServer = `http://${ip}:8000`
const Wssockte = `ws://${ip}:8000`

function messageTip(type, tipInfo){
    ElNotification({
        title: 'ICClub 提示您！',
        message: tipInfo,
        type: type,
      })
}

export {staticServer, httpServer, Wssockte, messageTip}




