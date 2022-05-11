import { Observable, Subject } from "rxjs";

class LoadingService {

    private loadingSubject: Subject<boolean> = new Subject();
    public loadingEvent: Observable<boolean> = this.loadingSubject.asObservable();

    public show(){
        this.loadingSubject.next(true);
    }
    
    public hide(){
        this.loadingSubject.next(false);
    }
}

export default new LoadingService();