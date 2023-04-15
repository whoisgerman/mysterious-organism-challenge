// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // Specimen factory. returns an object.
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum: specimenNum,
      dna: dna,
      mutate(){
        let simDna = [];
        for (const base of this.dna){
          simDna.push(base);
        }
  
        let targetIndex = Math.floor(Math.random() * simDna.length);
        let targetBase = simDna[targetIndex];
        let newBase = returnRandBase();
  
        while(newBase === targetBase){
          newBase = returnRandBase();
        }
  
        simDna[targetIndex] = newBase;
        return simDna;
        
      },
      compareDNA (pAequor) {
        let baseCount = 0;
        for(let i = 0; i < pAequor.dna.length; i++) {
          for(let j = 0; j < this.dna.length; j++) {
            if (pAequor.dna[i] === this.dna[j] && i === j){
              baseCount += 1; 
            }
          }
        }
  
        let percentShare = Math.round((baseCount / this.dna.length) * 100);
        
        console.log(`Specimen #${pAequor.specimenNum} and specimen #${this.specimenNum} have ${percentShare}% DNA in common.`);
      },
      willLikelySurvive(){
        let percentC = 0;
        let percentG = 0;
  
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === 'C'){
            percentC += 1;
          } else if (this.dna[i] === 'G'){
            percentG += 1;
          }
        }
        
        percentC = Math.round((percentC / this.dna.length) * 100);
        percentG = Math.round((percentG / this.dna.length) * 100);
        
        if (percentC >= 60 || percentG >= 60){
          return true;
        }
  
        return false;
      }
    }
  }
  
  // Returns an array with desired amount of specimen
  const bulkSpecimen = amount => {
    const specBatch = [];
    let specCheck = 0;
  
    while (specCheck < amount){
      specToCheck = pAequorFactory(specCheck + 1, mockUpStrand());
      
      if(specToCheck.willLikelySurvive()){
        specCheck += 1;
        specBatch.push(specToCheck);
      }
    }
  
    return specBatch;
  }
  
  const newSpecimen = bulkSpecimen(30);
  newSpecimen.forEach(el => console.log(el.dna.join('-')));
  
  //let beta = pAequorFactory(00001,mockUpStrand());
  //let alpha = pAequorFactory(00002,mockUpStrand());
  
  //beta.compareDNA(alpha);
  //console.log(beta.willLikelySurvive());
  //console.log(beta.mutate());
  //console.log(beta.dna);
  //console.log('Done');
  
  
  
  
  