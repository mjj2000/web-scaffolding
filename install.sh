# install dependencies for npm and bower
npm install .;
patch -p1 < livereload-random-port.patch;
(cd app;bower install);
