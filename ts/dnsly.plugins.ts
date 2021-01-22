import * as smartenv from '@pushrocks/smartenv';
const smartenvInstance = new smartenv.Smartenv();
// node native scope
import type dnsType from 'dns';
const dns: typeof dnsType = smartenvInstance.getSafeNodeModule('dns'); 

export { dns };

// pushrocks scope
import * as smartdelay from '@pushrocks/smartdelay';
import * as smartpromise from '@pushrocks/smartpromise';
import * as smartrequest from '@pushrocks/smartrequest';

export { smartdelay, smartenv, smartpromise, smartrequest };

import * as tsclass from '@tsclass/tsclass';

export { tsclass };

// third party scope

const dns2 = smartenvInstance.getSafeNodeModule('dns2');

export {
  dns2
}
