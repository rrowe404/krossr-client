import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

/** Debounces a function to execute on the tail end */
export function debounce(func: () => void, timeout: number = 250) {
    let subject = new Subject<void>();

    subject.pipe(debounceTime(timeout)).subscribe(() => {
        func();
    });

    return subject;
}


export function nowAndLater(now: () => void, later: () => void, timeout: number = 1000) {
    let subject = new Subject<void>();

    now();

    subject.pipe(debounceTime(timeout)).subscribe(() => {
        later();
    });

    subject.next();

    return subject;
}
