import { Injectable } from '@angular/core';
import {
    CreateLevelBodyViewModel,
    DefaultService,
    LevelListLevelViewModel,
    LevelListViewModel,
    LevelViewModel,
} from '@krossr/api';

const hardcodedLevels: LevelListLevelViewModel[] = [
    {
        completed: false,
        editable: false,
        id: 3,
        layout: 'MTAwMDExMDAwMTExMTExMTAwMDExMDAwMQ==',
        name: 'Historical',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:30:10 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
    {
        completed: false,
        editable: false,
        id: 4,
        layout: 'MTExMTEwMDEwMDAwMTAwMDAxMDAxMTExMQ==',
        name: 'Idyllic',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:31:02 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
    {
        completed: false,
        editable: false,
        id: 5,
        layout: 'MTExMTExMDAwMTExMTExMTAxMDAxMDAxMA==',
        name: 'Romantic',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:31:24 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
    {
        completed: false,
        editable: false,
        id: 6,
        layout: 'MTExMTExMDAwMDExMTExMTAwMDAxMTExMQ==',
        name: 'Erroneous',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:32:10 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
    {
        completed: false,
        editable: false,
        id: 7,
        layout: 'MTExMTExMDEwMTEwMTAxMTAxMDExMDEwMQ==',
        name: 'Magnificent',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:32:34 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
    {
        completed: false,
        editable: false,
        id: 8,
        layout: 'MTExMTExMDAwMTExMTExMTAwMDAxMTExMQ==',
        name: 'Exciting',
        prettySize: '5x5',
        size: 5,
        avgRating: null,
        createdAt:
            'Sat Feb 19 2022 16:33:03 GMT+0000 (Coordinated Universal Time)',
        user: {
            id: 1,
            username: 'rosalyn',
        },
    },
];

const numPerPage = 10;

@Injectable({
    providedIn: 'root',
})
export class LevelService {
    constructor(private api: DefaultService) {}

    createLevel(params: CreateLevelBodyViewModel) {
        // todo create fully encoded viewmodel & use as url
    }

    getLevel(levelId: string): LevelViewModel {
        return this.toLevelViewModel(
            hardcodedLevels.find((x) => x.id === parseInt(levelId, 10))
        );
    }

    private toLevelViewModel(level: LevelListLevelViewModel): LevelViewModel {
        return {
            id: level.id,
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

        vm.levels.forEach(level => level.completed = localStorage.getItem(level.id.toString()) === 'true')

        return Promise.resolve(vm);
    }
}
