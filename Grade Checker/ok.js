function evenOdd(){

    let number = 
    document.getElementById("number").value;

    if(number >= 33&& number <40){
        console.log(number ," is C")
    }
    else if(number>=40 && number <60){
        console.log(number ," is B")
}
else if(number>=60&& number <70){
    console.log(number ," is A-")
}
else if(number>=70 && number <80){
    console.log(number ," is A")
}
else if(number>=80&& number <90){
    console.log(number ," is A+")
}
else if(number>=90&& number <101){
    console.log(number ," is Golden A+")
}

else if(number>=0 && number <33){
    console.log(number ," is Fail")
}

    else{
        console.log(number,"Not Found");
    }

}