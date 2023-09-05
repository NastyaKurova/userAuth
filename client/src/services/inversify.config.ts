import { Container } from 'inversify';
import { DateService } from "./srvices";


const container = new Container();
container.bind<DateService>(DateService).toSelf();
export default container;