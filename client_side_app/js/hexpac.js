function hexpac(clusters, cluster_diameter, width, height) {
    var a = clusters;
    var cluster_padding = cluster_diameter/2;

    function roomy(cols) {
        // console.log('roomy cols: ' + cols);
        console.log('roomy width: ' + width);
        console.log('roomy clusters: ' + cols*(cluster_diameter+(2*cluster_padding))/2);
        return width - cols*(cluster_diameter+(2*cluster_padding))/2 > 0;
    }

    for (var k=2;k<=a;k++) {
        if ((2*a+k-1)/(2*k)%1==0) {
            // console.log(k + ' rows has option 1');
            n=(2*a+k-1)/(2*k);
            // console.log('n: ' + n);
            var cols = 2*n-1;
            // console.log(roomy(cols));

            if (roomy(cols)) {
                // console.log('option: 1,' + k + ' rows');
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: i*width/(n+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n-1; i++) {
                            foci.push({
                                x: (2*i+1)*width/(2*(n+1)),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((2*a+k)/(2*k)%1==0) {
            // console.log(k + ' rows has option 2');
            n=(2*a+k)/(2*k);
            // console.log('n: ' + n);
            var cols = 2*n-1;
            // console.log(roomy(cols));

            if (roomy(cols)) {
                // console.log('option: 2,' + k + ' rows');
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: i*width/(n+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n-1; i++) {
                            foci.push({
                                x: (2*i+1)*width/(2*(n+1)),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((2*a-k+1)/(2*k)%1==0) {
            // console.log('has option 3');
            n=(2*a-k+1)/(2*k);
            var cols = 2*(n+1);

            if (roomy(cols)) {
                // console.log('option: 3,' + k + ' rows');
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i)*width/cols,
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n+1; i++) {
                            foci.push({
                                x: (2*i-1)*width/cols,
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((a/k)%1==0) {
            // console.log('has option 4');
            n=a/k;
            var cols = 2*n;

            if (roomy(cols) && n>1) {
                // console.log('option: 4,' + k + ' rows');
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i-1)*width/(cols+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i)*width/(cols+1),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            } else if (n==1) {
                // console.log('option: 4,' + k + ' rows');
                var foci = [];
                for (j=1; j<=k; j++) {
                        foci.push({
                            x: width/2,
                            y: j*height/(k+1)
                        });
                }
                return foci;
            }
        }

    }
}

// function hexpac(form) {
// a=eval(form.a.value);

// var k = 2;
// var linne="Hexagonal Packing Arrangements"+"\n"+"\n";
// for (k=2;k<=Math.floor(0.5*a);k++) {
//     if ((2*a+k-1)/(2*k)%1==0) {
//     n=(2*a+k-1)/(2*k);
//     linne=linne+k+" rows alternating "+n+", "+(n-1)+", \n"+"perimeter = "+Math.round(10000*(2*n+Math.sqrt(3)*(k-1)+2))/10000+"  area = "+Math.round(10000*n*(1+0.5*Math.sqrt(3)*(k-1)))/10000+"\n"+"\n";}

//     if ((2*a+k)/(2*k)%1==0) {
//     n=(2*a+k)/(2*k);
//     linne=linne+k+" rows alternating "+n+", "+(n-1)+", \n"+"perimeter = "+Math.round(10000*(2*n+Math.sqrt(3)*(k-1)+2))/10000+"  area = "+Math.round(10000*n*(1+0.5*Math.sqrt(3)*(k-1)))/10000+"\n"+"\n";}

//     if ((2*a-k+1)/(2*k)%1==0) {
//     n=(2*a-k+1)/(2*k);
//     linne=linne+k+" rows alternating "+n+", "+(n+1)+", \n"+"perimeter = "+Math.round(10000*(2*(n+1)+Math.sqrt(3)*(k-1)+2))/10000+"  area = "+Math.round(10000*(n+1)*(1+0.5*Math.sqrt(3)*(k-1)))/10000+"\n"+"\n";}

//     if ((a/k)%1==0) {
//     n=a/k;
//     linne=linne+k+" staggered rows of "+n+", \n"+"perimeter = "+Math.round(10000*(2*n+Math.sqrt(3)*(k-1)+3))/10000+"  area = "+Math.round(10000*(n+0.5)*(1+0.5*Math.sqrt(3)*(k-1)))/10000+"\n"+"\n";}

//     else {linne=linne;}
// }

// var j = 2;
// var limme="Rectangular Packing Arrangements"+"\n"+"\n";
// for (j=2;j<=Math.sqrt(a);j++) {
//     if ((a/j)%1==0) {
//     n=a/j;
//     limme=limme+j+" rows of "+n+"\n"+"perimeter = "+(2*n+2*j)+"  area = "+a+"\n"+"\n";}

//     else {limme=limme;}
// }

// form.qq.value=linne;
// form.pp.value=limme;}
