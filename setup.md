Setup instructions:

echo checkout pegs dependency
git clone https://github.com/krisnye/pegs
cd pegs
    yarn dev
    cd ..
echo checkout ion 2.0 branch dependency for generating ion 2 bootstrapped classes
git clone https://github.com/krisnye/ion.git ion2boot
cd ion2boot
    git fetch
    git checkout 2.0
    yarn dev
    cd ..
echo checkout ion 2.1 branch for current compiler that uses bootstrapped model
git clone https://github.com/krisnye/ion.git ion
cd ion
    git fetch
    git checkout 2.1
    yarn dev
    yarn watch
