# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cesta', '0003_remove_carro_pedido'),
        ('pedido', '0013_remove_pedido_pagado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='total',
        ),
        migrations.AddField(
            model_name='pedido',
            name='carro',
            field=models.ForeignKey(blank=True, to='cesta.Carro', null=True),
            preserve_default=True,
        ),
    ]
