function init(){
    script.log('Script Init');
}

function moduleValueChanged(value){
    script.log('moduleValueChanged');
    script.log(value.isParameter());
    canal = value.getParent().name;
    if (value.isParameter()){
        if (canal == "tape"){tape(1, value.name, value.get());}
        else {
            zone = value.getParent().getParent().name;
            if (zone == "strips"){strip_update(canal, value.name, value.get());}
            if (zone == "bus"){bus_update(canal, value.name, value.get());}
        }
    } else {
        if (canal == "tape"){tape(1, value.name, 1);}
        else {
            zone = value.getParent().getParent().name;
            if (zone == "strips"){strip_update(canal, value.name, 1);}
            if (zone == "bus"){bus_update(canal, value.name, 1);}
        }
    }
}

function ccEvent(channel, number, value){
    if (number==1){
        local.values.strips.getChild(channel).l_R_Pan.set(value/127);
    }
    if (number==5){
        local.values.strips.getChild(channel).comp.set(value/127);
    }
    if (number==6){
        local.values.strips.getChild(channel).gate.set(value/127);
    }
    if (number==7){
        local.values.strips.getChild(channel).denoiser.set(value/127);
    }
    if (number==8){
        local.values.strips.getChild(channel).limiter.set(value/127);
    }
    if (number==9){
        local.values.strips.getChild(channel).reverb.set(value/127);
    }
    if (number==10){
        local.values.strips.getChild(channel).delay.set(value/127);
    }
    if (number==11){
        local.values.strips.getChild(channel).ext_FX1.set(value/127);
    }
    if (number==12){
        local.values.strips.getChild(channel).ext_FX2.set(value/127);
    }
    if (number==100){
        local.values.tape.tape_Gain.set((value-1)/127);
    }
}

function pitchWheelEvent(channel,value){
    if (channel <= 8) {local.values.strips.getChild(channel).gain_Fader.set((value-1)/16383);}
    if (channel >= 9) {local.values.bus.getChild(channel-8).gain_Fader.set((value-1)/16383);}
}

function tape(canal, nom, value){
    if (nom == "tape_Gain"){
        local.sendCC(canal,100,parseFloat(value)*127);
    }
    if (nom == "play"){
        local.sendCC(canal,101,1);
    }
    if (nom == "rec"){
        local.sendCC(canal,102,1);
    }
    if (nom == "stop"){
        local.sendCC(canal,103,1);
    }
    if (nom == "rew"){
        local.sendCC(canal,104,1);
    }
    if (nom == "ff"){
        local.sendCC(canal,105,1);
    }
    if (nom == "replay"){
        local.sendCC(canal,106,1);
    }
}

function strip_update(canal, nom, value){
    script.log('Strip Update');
    if (nom == "switch_B1_B2"){
        local.sendCC(canal,0,1);
    }
    if (nom == "gain_Fader"){
        local.sendPitchWheel(canal,parseFloat(value)*16383);
    }
    if (nom == "l_R_Pan"){
        local.sendCC(canal,1,parseFloat(value)*127);
    }
    if (nom == "reset_Pan"){
        local.sendCC(canal,2,1);
    }
    if (nom == "mute"){
        local.sendCC(canal,3,1);
    }
    if (nom == "solo"){
        local.sendCC(canal,4,1);
    }
    if (nom == "comp"){
        local.sendCC(canal,5,parseFloat(value)*127);
    }
    if (nom == "gate"){
        local.sendCC(canal,6,parseFloat(value)*127);
    }
    if (nom == "denoiser"){
        local.sendCC(canal,7,parseFloat(value)*127);
    }
    if (nom == "limiter"){
        local.sendCC(canal,8,parseFloat(value)*127);
    }
    if (nom == "reverb"){
        local.sendCC(canal,9,parseFloat(value)*127);
    }
    if (nom == "delay"){
        local.sendCC(canal,10,parseFloat(value)*127);
    }
    if (nom == "ext_FX1"){
        local.sendCC(canal,11,parseFloat(value)*127);
    }
    if (nom == "ext_FX2"){
        local.sendCC(canal,12,parseFloat(value)*127);
    }
    if (nom == "a1"){
        local.sendCC(canal,13,1);
    }
    if (nom == "a2"){
        local.sendCC(canal,14,1);
    }
    if (nom == "a3"){
        local.sendCC(canal,15,1);
    }
    if (nom == "a4"){
        local.sendCC(canal,16,1);
    }
    if (nom == "a5"){
        local.sendCC(canal,17,1);
    }
    if (nom == "b1"){
        local.sendCC(canal,18,1);
    }
    if (nom == "b2"){
        local.sendCC(canal,19,1);
    }
    if (nom == "b3"){
        local.sendCC(canal,20,1);
    }
    if (nom == "m_c"){
        local.sendCC(canal,21,1);
    }
    if (nom == "k"){
        local.sendCC(canal,21,1);
    }
    if (nom == "eQ_High"){
        local.sendCC(canal,22,parseFloat(value)*127);
    }
    if (nom == "eQ_Med"){
        local.sendCC(canal,23,parseFloat(value)*127);
    }
    if (nom == "eQ_Low"){
        local.sendCC(canal,24,parseFloat(value)*127);
    }
    if (nom == "app#1_Volume"){
        local.sendCC(canal,25,parseFloat(value)*127);
    }
    if (nom == "app#2_Volume"){
        local.sendCC(canal,26,parseFloat(value)*127);
    }
    if (nom == "app#3_Volume"){
        local.sendCC(canal,27,parseFloat(value)*127);
    }
    if (nom == "app#4_Volume"){
        local.sendCC(canal,28,parseFloat(value)*127);
    }
    if (nom == "app#1_Mute"){
        local.sendCC(canal,29,1);
    }
    if (nom == "app#2_Mute"){
        local.sendCC(canal,30,1);
    }
    if (nom == "app#3_Mute"){
        local.sendCC(canal,31,1);
    }
    if (nom == "app#4_Mute"){
        local.sendCC(canal,32,1);
    }
}

function bus_update(canal, nom, value){
    script.log('Bus Update');
    canal = parseInt(canal) + 8;
    if (nom == "gain_Fader"){
        local.sendPitchWheel(canal,parseFloat(value)*16383);
    }
    if (nom == "select"){
        local.sendCC(canal,2,1);
    }
    if (nom == "mute"){
        local.sendCC(canal,3,1);
    }
    if (nom == "eq"){
        local.sendCC(canal,4,1);
    }
}