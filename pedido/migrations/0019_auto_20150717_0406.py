# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0018_auto_20150717_0359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='gasto_envio',
            field=models.DecimalField(null=True, max_digits=12, decimal_places=2, blank=True),
            preserve_default=True,
        ),
    ]
