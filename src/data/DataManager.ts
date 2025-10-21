import { dataMap } from './Data'
import { GameSettings, Task } from '../types'

export class DataManager {
    static getTasks(settings: GameSettings): Task[] {
        const tasks: Task[] = [];

        tasks.push(...dataMap.generalTasks.map(text => ({ type: "general" as const, text })));

        if (settings.colorMode) {
            tasks.push(...dataMap.colorTasks.map(text => ({ type: "color" as const, text })));
        }

        if (settings.extremoMode) {
            tasks.push(...dataMap.extremeTasks.map(text => ({ type: "extreme" as const, text })));
        }

        if (settings.alcoholMode) {
            tasks.push(...dataMap.alcoholTasks.map(text => ({ type: "alcohol" as const, text })));
        }
        return tasks;
    }

    static getTasksMasters(settings: GameSettings): Task[] {
        const tasksMaster: Task[] = [];
        if (settings.masterMode) {
            tasksMaster.push(...dataMap.masterTasks.map(text => ({ type: "master" as const, text })));
        }
        if (settings.masterMode && settings.extremoMode) {
            tasksMaster.push(...dataMap.masterExtremeTasks.map(text => ({ type: "masterExtreme" as const, text })));
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