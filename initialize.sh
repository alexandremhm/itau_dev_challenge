clear
echo "
###############################################
#          INSTALANDO DEPENDENCIAS            #
###############################################
"
cd ./Business
npm install --quiet
wait
node src/core/migrations.js
wait
cd ..
clear
#
cd ./Login
npm install --quiet
wait
cd ..
clear

echo "
###############################################
#             INICIANDO APLICACAO             #
###############################################
"

gnome-terminal --window --working-directory=$PWD/Business --title="Business" -- npm start
wait
sleep 5
gnome-terminal --window --working-directory=$PWD/Login --title="Login" -- npm start

clear
echo "
###############################################
#             APLICACAO INICIADA              #
#    Business: http://localhost:4000          #
#  Login: http://localhost:5000               #
###############################################"
