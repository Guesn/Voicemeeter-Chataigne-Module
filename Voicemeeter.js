function init(){
    script.log('Script Init');
}

function moduleValueChanged(value){
    script.log('moduleValueChanged');
    canal = value.getParent().name;
    if (canal == "tape"){tape(value);}
    else {
        zone = value.getParent().getParent().name;
        if (zone == "strips"){strip_update(value);}
        if (zone == "bus"){bus_update(value);}
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

function tape(value){
    canal = 1;
    if (value.name == "tape_Gain"){
        local.sendCC(canal,100,value.get()*127);
    }
    if (value.name == "play"){
        local.sendCC(canal,101,1);
    }
    if (value.name == "rec"){
        local.sendCC(canal,102,1);
    }
    if (value.name == "stop"){
        local.sendCC(canal,103,1);
    }
    if (value.name == "rew"){
        local.sendCC(canal,104,1);
    }
    if (value.name == "ff"){
        local.sendCC(canal,105,1);
    }
    if (value.name == "replay"){
        local.sendCC(canal,106,1);
    }
}

function strip_update(value){
    script.log('Strip Update');
    canal = value.getParent().name;
    if (value.name == "switch_B1_B2"){
        local.sendCC(canal,0,1);
    }
    if (value.name == "gain_Fader"){
        local.sendPitchWheel(canal,value.get()*16383);
    }
    if (value.name == "l_R_Pan"){
        local.sendCC(canal,1,value.get()*127);
    }
    if (value.name == "reset_Pan"){
        local.sendCC(canal,2,1);
    }
    if (value.name == "mute"){
        local.sendCC(canal,3,1);
    }
    if (value.name == "solo"){
        local.sendCC(canal,4,1);
    }
    if (value.name == "comp"){
        local.sendCC(canal,5,value.get()*127);
    }
    if (value.name == "gate"){
        local.sendCC(canal,6,value.get()*127);
    }
    if (value.name == "denoiser"){
        local.sendCC(canal,7,value.get()*127);
    }
    if (value.name == "limiter"){
        local.sendCC(canal,8,value.get()*127);
    }
    if (value.name == "reverb"){
        local.sendCC(canal,9,value.get()*127);
    }
    if (value.name == "delay"){
        local.sendCC(canal,10,value.get()*127);
    }
    if (value.name == "ext_FX1"){
        local.sendCC(canal,11,value.get()*127);
    }
    if (value.name == "ext_FX2"){
        local.sendCC(canal,12,value.get()*127);
    }
    if (value.name == "a1"){
        local.sendCC(canal,13,1);
    }
    if (value.name == "a2"){
        local.sendCC(canal,14,1);
    }
    if (value.name == "a3"){
        local.sendCC(canal,15,1);
    }
    if (value.name == "a4"){
        local.sendCC(canal,16,1);
    }
    if (value.name == "a5"){
        local.sendCC(canal,17,1);
    }
    if (value.name == "b1"){
        local.sendCC(canal,18,1);
    }
    if (value.name == "b2"){
        local.sendCC(canal,19,1);
    }
    if (value.name == "b3"){
        local.sendCC(canal,20,1);
    }
    if (value.name == "m_c"){
        local.sendCC(canal,21,1);
    }
    if (value.name == "k"){
        local.sendCC(canal,21,1);
    }
    if (value.name == "eQ_High"){
        local.sendCC(canal,22,value.get()*127);
    }
    if (value.name == "eQ_Med"){
        local.sendCC(canal,23,value.get()*127);
    }
    if (value.name == "eQ_Low"){
        local.sendCC(canal,24,value.get()*127);
    }
    if (value.name == "app#1_Volume"){
        local.sendCC(canal,25,value.get()*127);
    }
    if (value.name == "app#2_Volume"){
        local.sendCC(canal,26,value.get()*127);
    }
    if (value.name == "app#3_Volume"){
        local.sendCC(canal,27,value.get()*127);
    }
    if (value.name == "app#4_Volume"){
        local.sendCC(canal,28,value.get()*127);
    }
    if (value.name == "app#1_Mute"){
        local.sendCC(canal,29,1);
    }
    if (value.name == "app#2_Mute"){
        local.sendCC(canal,30,1);
    }
    if (value.name == "app#3_Mute"){
        local.sendCC(canal,31,1);
    }
    if (value.name == "app#4_Mute"){
        local.sendCC(canal,32,1);
    }
}

function bus_update(value){
    script.log('Bus Update');
    canal = value.getParent().name;
    canal = parseInt(canal) + 8;
    if (value.name == "gain_Fader"){
        local.sendPitchWheel(canal,value.get()*16383);
    }
    if (value.name == "select"){
        local.sendCC(canal,2,1);
    }
    if (value.name == "mute"){
        local.sendCC(canal,3,1);
    }
    if (value.name == "eq"){
        local.sendCC(canal,4,1);
    }
}