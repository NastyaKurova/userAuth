import 'reflect-metadata';
import { injectable } from 'inversify';


export interface IDateService {
    getFormattedDate(timestamp: number): string;
}

@injectable()
export class DateService implements IDateService{
    getFormattedDate(timestamp: number) {
        return new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'UTC' });
    }
}

