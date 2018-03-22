import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Session e2e test', () => {

    let navBarPage: NavBarPage;
    let sessionDialogPage: SessionDialogPage;
    let sessionComponentsPage: SessionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sessions', () => {
        navBarPage.goToEntity('session');
        sessionComponentsPage = new SessionComponentsPage();
        expect(sessionComponentsPage.getTitle())
            .toMatch(/Sessions/);

    });

    it('should load create Session dialog', () => {
        sessionComponentsPage.clickOnCreateButton();
        sessionDialogPage = new SessionDialogPage();
        expect(sessionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Session/);
        sessionDialogPage.close();
    });

    it('should create and save Sessions', () => {
        sessionComponentsPage.clickOnCreateButton();
        sessionDialogPage.setTitleInput('title');
        expect(sessionDialogPage.getTitleInput()).toMatch('title');
        sessionDialogPage.setDescriptionInput(absolutePath);
        sessionDialogPage.setStartDateTimeInput(12310020012301);
        expect(sessionDialogPage.getStartDateTimeInput()).toMatch('2001-12-31T02:30');
        sessionDialogPage.setEndDataTimeInput(12310020012301);
        expect(sessionDialogPage.getEndDataTimeInput()).toMatch('2001-12-31T02:30');
        sessionDialogPage.save();
        expect(sessionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SessionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-session div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SessionDialogPage {
    modalTitle = element(by.css('h4#mySessionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#file_description'));
    startDateTimeInput = element(by.css('input#field_startDateTime'));
    endDataTimeInput = element(by.css('input#field_endDataTime'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setStartDateTimeInput = function(startDateTime) {
        this.startDateTimeInput.sendKeys(startDateTime);
    };

    getStartDateTimeInput = function() {
        return this.startDateTimeInput.getAttribute('value');
    };

    setEndDataTimeInput = function(endDataTime) {
        this.endDataTimeInput.sendKeys(endDataTime);
    };

    getEndDataTimeInput = function() {
        return this.endDataTimeInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
