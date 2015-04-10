function hexpac(clusters, cluster_diameter, width, height) {
    var a = clusters;
    var cluster_padding = cluster_diameter/2;

    function roomy(cols) {
        return width - cols*(cluster_diameter+(2*cluster_padding))/2 > 0;
    }

    for (var k=2;k<=a;k++) {
        if ((2*a+k-1)/(2*k)%1==0) {
            n=(2*a+k-1)/(2*k);
            var cols = 2*n-1;

            if (roomy(cols)) {
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
            n=(2*a+k)/(2*k);
            var cols = 2*n-1;

            if (roomy(cols)) {
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
            n=(2*a-k+1)/(2*k);
            var cols = 2*(n+1);

            if (roomy(cols)) {
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
            n=a/k;
            var cols = 2*n;

            if (roomy(cols) && n>1) {
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
