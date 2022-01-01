import BaseController from "@root/base/BaseController";
import { MasterDataInterface } from "@root/bootstrap/StartMasterData";
import { Server } from "socket.io";

declare var io: Server
declare var masterData: MasterDataInterface

export interface ExportListenerInterface extends BaseControllerInterface {
  stageData: { (err: any, props: any): void }
  pushData: { (err: any, props: any): void }
  saveHistoryData: { (props: any): void }
}

export default BaseController.extend<ExportListenerInterface>({
  stageData: function (err, props) {
    let self = this;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
  },
  pushData: function (err, props) {
    let self = this;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
  },
  saveHistoryData: function (props) {
    let gg: {
      [key: string]: any
    } = masterData.getData(props.to, {}) as any;
    gg[props.key] = props.return;
    masterData.saveData(props.to, gg);
    let timeoutDelete: string = masterData.getData("deleted_" + props.to, "") as any;
    if (timeoutDelete == "") {
      setTimeout(function (props: any) {
        masterData.removeListener(props.to, "");
        masterData.removeListener('deleted_' + props.to, "");
        console.log(' -> ', props.to, ' is deleted');
      }.bind(this, props), 60000);
      masterData.saveData("deleted_" + props.to, props.key);
    }
  }
});