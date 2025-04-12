export interface LevelViewModel {
    layout: string;
    name: string;
    /**
     * At time of writing, all levels are square. The size should be the length of one side, or the square root of the total number of tiles.
     */
    size: number;
}

export interface CreateLevelBodyViewModel {
    name: string;
    decodedLayout: Array<Array<boolean>>;
}

export interface LevelListFilterSelectOptionsViewModel {
    sortByOptions: {
        [key: string]: string;
    };
    sizeOptions: {
        [key: string]: number;
    };
    sortDirectionOptions: {
        [key: string]: string;
    };
}

export interface LevelListFilterOptions {
    sizeRestriction?: string;
    searchText?: string;
    sortBy?: string;
    sortDirection?: string;
}

export interface LevelListLevelViewModel {
    id?: number;
    layout: string;
    name: string;
    /**
     * At time of writing, all levels are square. The size should be the length of one side, or the square root of the total number of tiles.
     */
    size: number;
    /**
     * Access control
     */
    canDelete?: boolean;
    /**
     * Access control
     */
    canBanLayout?: boolean;
    avgRating: string;
    completed: boolean;
    createdAt: string;
    /**
     * Formatted for display
     */
    prettySize: string;
    editable: boolean;
}


export interface LevelListViewModel {
    count: number;
    numPerPage: number;
    levels: Array<LevelListLevelViewModel>;
}

export interface LevelEditorSelectOptionsViewModel {
    sizeOptions: {
        [key: string]: number;
    };
}

export interface ILevel extends LevelViewModel {
    decodedLayout?: boolean[][];
    size: number;
}
