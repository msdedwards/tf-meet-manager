import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking'

export default class MeetInputTimeController extends Controller {
    @tracked times = [];
    @tracked numRunners;
    @tracked format = "{place}-{hour}:{minute}'{second} {centiseconds}"
    
    @action
    onDetection(text) {
        console.log({text});        
        this.times = this.refineTextAlt(text, this.times);
    }

    refineText(text, times) {
        for (let i = 0; i < text.length; i++) {
            let lines = text[i].rawValue.split('\n');
            for (let j = 0; j < lines.length; j++) {
                // times.push(lines[j]);   
                if(/\d+-\d:\d\d[' ]\d\d \d\d/.test(lines[j]))
                {
                    let [place, time] = lines[j].split('-');
                    if(place <= this.numRunners)
                    times[place] = time;
                }
                // if (this.isMoreAccurate(time, times[place]))) {
                //     times[place] = time;
                // }
            }
        }
        return times;
    }

    refineTextAlt(text, times) {
        for (let i = 0; i < text.length; i++) {
            let lines = text[i].rawValue.split('\n');
            for (let j = 0; j < lines.length; j++) {
                if(/\d+-\d:\d\d[' ]\d\d \d\d/.test(lines[j]))
                {
                    let [place, time] = lines[j].split('-');
                    if(place <= this.numRunners)
                    times[place] = time;
                }
                // if (this.isMoreAccurate(time, times[place]))) {
                //     times[place] = time;
                // }
            }
        }
        return times;
    }

    isMoreAccurate(newTime, oldTime) {
        if (this.formatPoints(newTime) > this.formatPoints(oldTime)) {
            return newTime
        } else {
            return oldTime;
        }
    }

    formatPoints(str) {
        let sum = 0;
        if (str[1] == ':') {
            sum++;
        }
        if (str[4] == '\'' || str[4] == ' ') {
            sum++;
        }
        if (str[7] == ' ') {
            sum++;
        }
        return sum;
    }
}
