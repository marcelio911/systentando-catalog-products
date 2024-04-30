#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Uso: $1 <nome_do_modulo>"
    exit 1
fi

# Adiciona a extensão ".webm" ao nome do arquivo
module_path="$1"

echo "Criando módulo..."

nest g module modules/${module_path}

echo "Criando service e alterando módulo..."

nest g service modules/${module_path}
echo "Criando controller e alterando módulo..."
nest g controller modules/${module_path}

nest g class ${module_path}Dto modules/${module_path}/dto
nest g class ${module_path}Repository modules/${module_path}/repository
nest g class ${module_path}Entity modules/${module_path}/entities
nest g class ${module_path}Mapper modules/${module_path}/mapper

nest g class ${module_path}Unit modules/${module_path}/tests/units
nest g class ${module_path}Integration modules/${module_path}/tests/integration

# echo "Módulo criado com sucesso!"
