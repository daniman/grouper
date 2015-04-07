function hexpac(clusters, cluster_diameter, width, height) {

    var cluster_padding = 20;

    function roomy(cols) {
        return width - cols*(cluster_diameter+(2*cluster_padding)) > 0;
    }

    for (var k=2; k<=clusters; k++) {

        if ((2*clusters+k-1)/(2*k)%1==0 || (2*clusters+k)/(2*k)%1==0) {
            n=(2*clusters+k)/(2*k);
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
                        for (i=1; i<=n+1; i++) {
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

        if ((2*clusters-k+1)/(2*k)%1==0) {
            n=(2*clusters-k+1)/(2*k);
            var cols = 2*n+1;

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
                        for (i=1; i<=n+1; i++) {
                            foci.push({
                                x: (2*i-1)*width/(2*(n+1)),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((clusters/k)%1==0) {
            n=clusters/k;
            var cols = n+1;

            
            if (roomy(cols)) {
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: i*width/(n+2),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (i+1)*width/(n+2),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            } else if (n==1 && width<=(2*(cluster_diameter+(2*cluster_padding)))) {
                var foci = [];
                for (j=1; j<=k; j++) {
                        foci.push({
                            x: width/2,
                            y: j*height/(k+1)
                        })
                }
                return foci;
            }
        }

    }

    return null;
}