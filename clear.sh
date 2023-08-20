#!/bin/bash
count=1
count0=1
function looprm() {
#  echo "---$1"
  for dir in $(ls -a $1);
  do
    # shellcheck disable=SC1073
    # shellcheck disable=SC1019
    # shellcheck disable=SC1072
    # shellcheck disable=SC1020
#      echo "000"
#    echo "$dir"
    if [ -d "$1/$dir" ];then
      if [ $dir == ".git" ]; then
          count=$[$count+1]
          # shellcheck disable=SC2115
          # shellcheck disable=SC2092
          `rm -rf "$1/$dir"`
      elif [ $dir == "." ]; then
        count0=$[$count0+1]
#          echo "jump0"
      elif [ $dir == ".." ]; then
        count0=$[$count0+1]
#          echo "jump1"
      else
#        echo "$1/$dir"
        looprm "$1/$dir"
      fi
    fi
  done
}

looprm "/home/hzh/SCCSC"
echo $count
