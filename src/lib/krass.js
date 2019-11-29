Data.forEach((obj) => {//fyrir content
    if(!selected.length || selected.includes(obj.type)){
        if(obj.type === "youtube"){
            const ytData = document.createElement('div');
            ytData.classList.add(lecture-page__youtube);
            const youtubeFrame = document.createElement('iframe');
            //ekki viss hvernig eg set src og allt bullið hingað inn      
        }
        else if(obj.type === "text"){
            conts txtData = documnet.createElement('p');
            txtData.classList.add(lecture-page__text);
            //ehv fall sem skoðar hvort það komi fyrir /n 
        }
        else if(obj.type === "quote"){
            conts quoteData = documnet.createElement('div');
            quoteData.classList.add(lecture-page__quote);
            const quoteText = document.createElement('p');
            quoteText.classList.add(lecture-page__quote__text);
            quoteText.textContent = obj.data;
        }
        else if(obj.type === "image"){
            conts imgData = documnet.createElement('div');
            imgData.classList.add(lecture-page__image);
            //ehv til að sja hvaða mynd
            if(selected.includes(obj.caption)){
                const imgCaption = documnet.createElement('p');
                imgCaption.textContent = obj.caption;
            }
        }
        else if(obj.type === "heading"){
            conts headingData = documnet.createElement('h2');
            headingData.classList.add(lecture-page__heading);
            headingData.textContent = obj.data;
        }
        else if(obj.type === "list"){
            conts listData = documnet.createElement('ul');
            headingData.classList.add(lecture-page__list);
            forEach(obj){//í listanum
                const listText = document.createElement('li');
                listText.textContent = ;//hmm ekki viss
            }
        }
        else if(obj.type === "code"){
            conts codeData = documnet.createElement('div');
            headingData.classList.add(lecture-page__code);
            const codeText = document.createElement('p');
            //ehv til að fara i nyja linu

        }

    }
});