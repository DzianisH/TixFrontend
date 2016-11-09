/**
 * Created by DzianisH on 06.11.2016.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TixComponent } from './tix.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(TixComponent);