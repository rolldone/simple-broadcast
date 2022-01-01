import express from 'express';
import BaseController from './BaseController';
import { MasterDataInterface } from "@root/bootstrap/StartMasterData";
import { Server } from "socket.io";

interface ExportHttpListenerInterface extends BaseControllerInterface {
  index: Function
  stageData: { (req: express.Request, res: express.Response): void }
  pushData: { (req: express.Request, res: express.Response): void }
  saveHistoryData: { (props: any): void }
}

declare var io: Server
declare var masterData: MasterDataInterface

const ExportHttpListener = BaseController.extend(<ExportHttpListenerInterface>{
  async index(req: express.Request, res: express.Response) {
    res.send('Welcome to lacuisine broadcast service! ' + global.node_identity);
  },
  pushData: function (req, res) {
    let self = this;
    let props = req.body;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
  },
  stageData: function (req, res) {
    let self = this;
    let props = req.body;
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

export default ExportHttpListener;