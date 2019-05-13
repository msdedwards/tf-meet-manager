import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @tracked isActive;
    @action
    toggle() {
        this.isActive = !this.isActive;
    }
}
