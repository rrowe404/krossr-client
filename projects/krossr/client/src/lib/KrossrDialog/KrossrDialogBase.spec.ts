import { KrossrDialogBase } from "./KrossrDialogBase";
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
    selector: 'krossr-test-dialog',
    template: ''
})
class TestDialogComponent extends KrossrDialogBase {
}

describe('KrossrDialogBase', () => {
    let fixture: ComponentFixture<TestDialogComponent>;
    let component: TestDialogComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestDialogComponent
            ],
            providers: [
                { provide: MatDialogRef, useValue: { close: () => {} }}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestDialogComponent);
        component = fixture.componentInstance;
    });

    it('should close', () => {
        let matDialogRef: MatDialogRef<TestDialogComponent> = TestBed.inject(MatDialogRef);
        spyOn(matDialogRef, 'close');
        component.close();
        expect(matDialogRef.close).toHaveBeenCalled();
    });
});