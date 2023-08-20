#!/bin/bash

PATH=/bin:$PATH:$HOME/bin:/sbin:/usr/bin:/usr/sbin
export PATH
#echo $PATH

usage () {
        echo -en "USAGE: $0 [web list] or $0 [template] [web list]\nFor example: $0 host.template host.list(Field : [WEB URL] [INDEX WEB PAGE])\n" 1>&2
        exit 1
}

if [ $# -gt 2 ];then
        usage
        exit 1
fi

case "$#" in
        2)
                template=$1
                host_list=$2
        ;;
        1)
                template='webcheck.template'
                host_list=$1
        ;;
        0)
        #       template='webcheck.template'
        #        host_list='host.list'
                usage
        ;;
esac

if [ ! -f "${template}" ];then
        echo "template : ${template} not exist!" 1>&2
        exit 1
fi

if [ ! -f "${host_list}" ];then
        echo "host list : ${host_list} not exist!" 1>&2
        exit 1
fi

#echo $PWD/${host_list}
WEBTEMP="wcalltemp.txt"
rm $PWD/${WEBTEMP}
#cat $PWD/${host_list}
/bin/cat $PWD/${host_list}|
while read weburl index
do
        #echo "${ip}"|grep -oP '^\d{1,3}(\.\d{1,3}){3}$' >/dev/null 2>&1 || Field='not ip'
        #if [ "${Field}" = 'not ip' ];then
        #        echo "${ip} not ip!" 1>&2
        #        exit 1
        #fi
        #host_cfg="${hostname}-${ip}.cfg"
        tmppage="webtemp.txt"
        cp ${template} ${tmppage}
        sed -i "s/WEBURL/${weburl}/g;s/INDEX/${index}/g" ${tmppage}
        /bin/cat ${tmppage}>>${WEBTEMP}
done
/bin/cat webcheck_org.template>webcheck_${host_list}.cfg
/bin/cat ${WEBTEMP}>>webcheck_${host_list}.cfg
rm $PWD/${WEBTEMP}
