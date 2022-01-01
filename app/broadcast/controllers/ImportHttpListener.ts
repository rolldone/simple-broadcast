import express from 'express';
import BaseController from './BaseController';
import { MasterDataInterface } from "@root/bootstrap/StartMasterData";
import { Server } from "socket.io";

interface ExportHttpListenerInterface extends BaseControllerInterface {
  index: Function
  saveHistoryData: { (props: any): void }
  fetchData: { (req: express.Request, res: express.Response): void }
  pullData: { (req: express.Request, res: express.Response): void }
  installData: { (req: express.Request, res: express.Response): void }
}

declare var io: Server
declare var masterData: MasterDataInterface

const ImportHttpListener = BaseController.extend(<ExportHttpListenerInterface>{
  async index(req: express.Request, res: express.Response) {
    res.send('Welcome to lacuisine broadcast service! ' + global.node_identity);
  },
  fetchData: function (req, res) {
    let self = this;
    let props = req.body;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
    res.end();
  },
  pullData: function (req, res) {
    let self = this;
    let props = req.body;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
    res.end();
  },
  installData: function (req, res) {
    let self = this;
    let props = req.body;
    setTimeout(function (props: any) {
      self.saveHistoryData(props);
      console.log('tvaExcepReportListener -> ', props.to, ' - ', props);
      io.in(props.to).emit(props.key, props.return);
    }.bind(null, props), 100);
    res.end();
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

export default ImportHttpListener;