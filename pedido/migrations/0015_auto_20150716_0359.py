# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0014_auto_20150716_0338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='carro',
            field=models.ForeignKey(to='cesta.Carro'),
            preserve_default=True,
        ),
    ]
