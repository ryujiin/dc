# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0017_remove_pedido_carro'),
        ('cesta', '0003_remove_carro_pedido'),
    ]

    operations = [
        migrations.AddField(
            model_name='carro',
            name='pedido',
            field=models.ForeignKey(blank=True, to='pedido.Pedido', null=True),
            preserve_default=True,
        ),
    ]
