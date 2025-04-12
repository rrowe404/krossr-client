import { Injectable } from '@angular/core';
import {
    CreateLevelBodyViewModel,
    LevelListLevelViewModel,
    LevelListViewModel,
    LevelViewModel,
} from 'src/Level/Level';
import { LevelEncoder } from 'src/LevelEncoder/LevelEncoder';

const hardcodedLevels: LevelListLevelViewModel[] = [
    {
        completed: false,
        editable: false,
        layout: 'MTAwMDExMDAwMTExMTExMTAwMDExMDAwMQ==',
        name: 'Historical',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:30:10 GMT+0000 (Coordinated Universal Time)',
    },
    {
        completed: false,
        editable: false,
        layout: 'MTExMTEwMDEwMDAwMTAwMDAxMDAxMTExMQ==',
        name: 'Idyllic',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:31:02 GMT+0000 (Coordinated Universal Time)',
    },
    {
        completed: false,
        editable: false,
        layout: 'MTExMTExMDAwMTExMTExMTAxMDAxMDAxMA==',
        name: 'Romantic',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:31:24 GMT+0000 (Coordinated Universal Time)',
    },
    {
        completed: false,
        editable: false,
        layout: 'MTExMTExMDAwMDExMTExMTAwMDAxMTExMQ==',
        name: 'Erroneous',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:32:10 GMT+0000 (Coordinated Universal Time)',
    },
    {
        completed: false,
        editable: false,
        layout: 'MTExMTExMDEwMTEwMTAxMTAxMDExMDEwMQ==',
        name: 'Magnificent',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:32:34 GMT+0000 (Coordinated Universal Time)',
    },
    {
        completed: false,
        editable: false,
        layout: 'MTExMTExMDAwMTExMTExMTAwMDAxMTExMQ==',
        name: 'Exciting',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:33:03 GMT+0000 (Coordinated Universal Time)',
    },
];

const numPerPage = 10;

@Injectable({
    providedIn: 'root',
})
export class LevelService {
    constructor(private levelEncoder: LevelEncoder) {}

    createLevel(params: CreateLevelBodyViewModel) {
        return {
            layout: this.levelEncoder.encodeLayout(params.decodedLayout),
        };
        // todo create fully encoded viewmodel & use as url
    }

    getLevel(levelLayout: string): LevelViewModel {
        const level = hardcodedLevels.find((x) => x.layout === levelLayout);

        if (!level) {
            return {
                layout: levelLayout,
                name: 'todo',
                size: null,
            };
        }

        return this.toLevelViewModel(level);
    }

    private toLevelViewModel(level: LevelListLevelViewModel): LevelViewModel {
        return {
            layout: level.layout,
            name: level.name,
            size: level.size,
        };
    }

    private paginate(
        pageNum: string,
        sizeRestriction: string,
        searchText: string
    ): LevelListViewModel {
        let filteredlevels = [...hardcodedLevels];

        if (sizeRestriction) {
            filteredlevels = filteredlevels.filter(
                (level) => level.size === parseInt(sizeRestriction, 10)
            );
        }

        if (searchText) {
            filteredlevels = filteredlevels.filter((level) =>
                level.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // todo actual pagination
        return this.toLevelListViewModel(filteredlevels);
    }

    private toLevelListViewModel(
        levels: LevelListLevelViewModel[]
    ): LevelListViewModel {
        return {
            levels,
            count: levels.length,
            numPerPage,
        };
    }

    // TODO query type
    async getLevels(query: any): Promise<LevelListViewModel> {
        const vm = this.paginate(
            query.pageNum,
            query.sizeRestriction,
            query.searchText
        );

        vm.levels.forEach(
            (level) =>
                (level.completed =
                    localStorage.getItem(level.layout) === 'true')
        );

        return Promise.resolve(vm);
    }
}
