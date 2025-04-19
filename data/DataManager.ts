import { dataMap } from './Data'
import { GameSettings } from '../types'

export class DataManager {
    static getTasks(settings: GameSettings): string[] {
        const tasks = [...dataMap.generalTasks];
        if (settings.colorMode) {
            tasks.push(...dataMap.colorTasks);
        }
        if (settings.extremoMode) {
            tasks.push(...dataMap.extremeTasks);
        }
        if (settings.alcoholMode) {
            tasks.push(...dataMap.alcoholTasks);
        }
        return tasks;
    }

    static getTasksMasters(settings: GameSettings): string[] {
        const tasksMaster = [];
        if (settings.masterMode) {
            tasksMaster.push(...dataMap.masterTasks);
        }
        if (settings.masterMode && settings.extremoMode) {
            tasksMaster.push(...dataMap.masterExtremeTasks);
        }
        return tasksMaster;
    }

    static getParts(settings: GameSettings): string[] {
        const parts = [...dataMap.generalParts];
        if (settings.extremoMode) {
            parts.push(...dataMap.extremeParts);
        }
        return parts;
    }

    static getSpecificItems(id: keyof typeof dataMap): string[] {
        return [...dataMap[id]];
    }
}