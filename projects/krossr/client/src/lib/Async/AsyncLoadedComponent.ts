export interface AsyncLoadedComponent {
    isReady: boolean;
    ngOnInit?: () => Promise<void>;
}
