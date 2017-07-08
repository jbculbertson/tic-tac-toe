curl  "http://tic-tac-toe.wdibos.com/games?over=true" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
